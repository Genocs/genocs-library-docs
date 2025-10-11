---
title: "Azure Resource reloaction"
description: "How to move Azure resources from one Tenant to another"
lead: "How to move Azure resources from one Tenant to another"
date: 2025-01-31 11:08:50+02:00
lastmod: 2025-10-11T15:34:50Z
draft: false
images: []
menu:
  templates:
    identifier: "resources-relocation"
    name: "Azure Resource relocation"
    parent: "tutorials"
weight: 20
toc: true
---

## Introduction

Enhanced Azure Resource Tenant-to-Tenant Migration Procedure

This document outlines the procedure for migrating Azure resources from one tenant to another. Direct resource or resource group moves between tenants aren't supported. Instead, we migrate subscriptions.
This procedure uses a temporary "transfer subscription" in the source tenant. After the transfer, resources are moved to the final target subscription.

## Prerequisites

- **Administrative Access**: Global Administrator access in both source and destination tenants. Verify sufficient permissions to manage subscriptions, resources, and Azure Active Directory.
- **Subscription Management Permissions**: Permissions to create and manage subscriptions in both tenants.
- **Billing Ownership Transfer Permissions**: Permissions to transfer billing ownership of subscriptions.
- **Resource Inventory**: A detailed inventory of resources to be moved, including:
  - Resource Type
  - Resource Group
  - Dependencies (e.g., Virtual Networks, Storage Accounts, Databases)
  - Configurations (Network, Security, Data)
  - Special considerations (e.g., data residency requirements, licensing)
- **Backup and Recovery Plan**: A documented plan for backing up data and restoring it in case of issues.
- **Testing Plan**: A detailed testing plan to validate functionality after the migration.
- **Rollback Plan**: A plan to revert changes if the migration fails.

## Procedure

### 1. Preparation

- **Backup Data**: Back up all critical data, including databases, virtual machine disks, and configuration files. Consider using Azure Backup, Azure Site Recovery, or native application backup mechanisms.
  - **Export ARM Templates**: Export ARM templates for all resources to be moved. This will help with recreating the resources in the target environment if needed.
  - **Document Existing Configurations**: Document all relevant configurations, including:
  - **Network settings** (VNETs, subnets, NSGs, Route Tables)
  - **Security settings** (RBAC roles, policies, Key Vaults)
  - **Application configurations** (connection strings, dependencies)
  - **User and Service Principal** assignments
  - **Custom Role Definitions**
  - **Policies (Azure Policy)**
- **Create Transfer Subscription**: In the source tenant, create a new "Pay-As-You-Go" subscription. This will be used as a temporary holding place for the resources. Ensure the subscription is not associated with any existing CSP agreement.
- **Prepare Scripts (PowerShell/CLI)**: Develop scripts to:
  - Deploy resources from ARM templates.
  - Configure networking and security.
  - Assign RBAC roles.
  - Automate testing.

### 2. Resource Migration

- **Snapshot and Restore (If Necessary)**: If resources are in the same VNet and you cannot move them directly due to IP address conflicts, take snapshots of the resources in the original subscription and restore them to the transfer subscription. This approach requires downtime. Consider alternatives if possible to minimize disruption.
- **Downtime**: Plan for downtime during the migration window. Communicate the planned downtime to affected users.
- **Resource Move (If Possible)**: If resources can be moved directly, use the Azure portal, PowerShell, or CLI to move the resources from the original subscription to the transfer subscription. This is the preferred approach if it avoids IP address conflicts.
- **Validate in Transfer Subscription**: Thoroughly test the migrated resources in the transfer subscription to ensure they are functioning correctly. This includes application testing, database connectivity, and security validation.

### 3. Subscription Transfer

- **Transfer Billing Ownership**: Transfer the billing ownership of the transfer subscription to an account in the destination tenant. Follow the official Microsoft documentation for this process. Be aware of potential delays in this step.
- **Transfer Subscription**: After the billing ownership transfer is complete, transfer the entire subscription to the destination tenant. Again, follow the official Microsoft documentation. Be prepared for potential delays in the subscription appearing in the target tenant.

### 4. Post-Transfer

- **Verify Subscription Transfer**: Use the Azure portal or CLI to confirm that the subscription has been successfully transferred to the destination tenant.
- **Recreate Configurations**: In the destination tenant, recreate all the configurations documented in the preparation phase. This includes network settings, security settings, RBAC roles, policies, and application configurations. Use the scripts developed in the preparation phase to automate this process.
- **Move Resources to Final Subscription (Optional)**: If required by customer policy, move the resources from the transfer subscription to the final target subscription within the destination tenant.
- **Thorough Testing**: Conduct comprehensive testing in the destination tenant to validate all functionalities and configurations.
- **Cleanup**: Delete the transfer subscription and any temporary resources created during the migration process. Remove any access granted to the temporary user account.

### 5. Documentation

- Document the entire migration process, including any issues encountered and their resolutions.
- Update resource documentation to reflect the new location and configurations.

### Important Considerations

- **Downtime**: Minimize downtime by planning and executing the migration efficiently.
- **Testing**: Thorough testing is crucial to ensure a successful migration.
- **Rollback Plan**: Have a rollback plan in place in case of unexpected issues.
- **Communication**: Communicate the migration plan and any planned downtime to affected users.
- **Microsoft Support**: Consider engaging Microsoft Support for assistance with complex migrations.
- **Compliance**: Ensure compliance with data residency, security, and regulatory requirements during the migration.

This enhanced procedure provides a more comprehensive and robust approach to migrating Azure resources between tenants. By following these steps and considering the important considerations, you can minimize risks and ensure a smooth transition. Remember to always consult the official Microsoft documentation for the most up-to-date information and best practices.

## Solution

1. To create one user with _global admin_ rights in source tenant and given _ownership_ to source and target subscription in both tenants along with _global admin rights_.
2. To created one Pay-As-You-Go subscription as transfer subscription in source tenant using new ID with help of credit card as existing subscription was created by CSP partner
3. We have taken snapshots of resources and restored in Pay-As-You-Go subscription due to same VLAN was used for all resource groups in existing tenant.
4. Once restore completed then we putted down the all resources in existing subscription and enabled the moved resources in Pay-As-You-Go subscription.
5. Test the application, DBs and access.
6. When testing was completed by the application team then we changed the tenant using change directory option for Pay-As-You-Go subscription.
7. After a couple of hours Pay-As-You-Go subscription disappeared from source tenant and reflected in target tenant. Note: for couple of hours Pay-As-You-Go subscription was not visible to target tenant under subscription service so we have taken the ownership through dashboard in Azure portal of target tenant using elevated access. This issue happens sometimes as permission gets removed automatically when you do the tenant to tenant transfer of resources.
8. We did the complete test once again and when satisfied then move all resource to the target subscription in target tenant.
9. Finally, we did the cleanup from source tenant and target tenant.

Before proceeding with the next steps: wherever possible backup data and export ARM templates of the resources you are transferring.

Save any Users/Service Principals, Custom role definitions and Role assignments that the subscription currently works with the subscription and recreate them in the new tenant (az role and az assignment commands) because:

When you transfer billing ownership of your subscription to an account in another Azure AD tenant, you can move the subscription to the new account's tenant. If you do so, all users, groups, or service principals that had Azure role assignments to manage subscriptions and its resources lose their access.

Only the user in the new account who accepts your transfer request will have access to manage the resources. The new owner must manually add these users to the subscription to provide access to the user who lost it. For more information, see Transfer an Azure subscription to a different Azure AD directory.

Finally, we will follow the instructions for transferring an Azure Subscription to a new Tenant. Read [transfer-subscription](https://learn.microsoft.com/en-us/azure/role-based-access-control/transfer-subscription)
(Please note that this process takes a while to reflect the new resources in the new tenant, usually much longer than the 1-2 hours they mention).

If you do not see your resources in the Portal - try the CLI.

1. Transfer billing ownership of Azure Subscription to the other tenant (https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/billing-subscription-transfer)
2. Once billing ownership is transferred. Transfer the subscription to the new tenant.
   If you have any custom policies that applied to the subscription - those will have to be recreated too.

## References

Move all resources that need to be transferred to the new tenant into transfer-rg. Follow the guidance given for different resources:

- [move-resource-group-and-subscription](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription)

- [move-resources-between-subscriptions-under-different-tenants](https://social.technet.microsoft.com/wiki/contents/articles/51360.azure-how-to-move-resources-between-subscriptions-under-different-tenants.aspx)

You could try downloading the VHD and then uploading it on the other tenant

- [download-vhd](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/download-vhd)
- [upload-generalized-managed](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/upload-generalized-managed)
