---
title : "CQRS"
description: "Commands, queries and event handlers."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-05-13T15:40:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "cqrs"
    name: "CQRS"
    parent: "library"
weight: 4
toc: true
---

## Installation

``` bash
dotnet add package Genocs.CQRS
```

## Dependencies

- Genocs.Core

## Commands

### Overview

Adds an ability to create and process commands in the sense of [CQRS](https://martinfowler.com/bliki/CQRS.html).

### Usage

Implement `ICommand` (marker) interface in the selected class. Since the command represents the user’s intention you should follow the convention:

- Keep all the commands immutable
- Name of your commands should be imperative

``` cs
public class CreateAccount : ICommand
{
    public Guid Id { get; }
    public string Email { get; }
    public string Password { get; }

    public CreateUser(id, email, password)
    {
        Id = id;
        Email = email;
        Password = password;
    }
}
```

Create dedicated command handler class that implements `ICommandHandler<TCommand>` interface with `HandleAsync()` method:

``` cs
public class CreateAccountHandler : ICommandHandler<CreateAccount>
{
    public Task HandleAsync(CreateAccount command)
    {
        //put the handling code here
    }
}
```

You can easily register all command handlers in DI container by calling `AddCommandHandlers()` method on `IGenocsBuilder`:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddCommandHandlers();

    //other registrations    
    return builder.Build();
}
```

Dispatching a particular command object can be also done using `Genocs.Common` package. Start with registering in-memory dispatcher on your `IGenocsBuilder` by calling a `AddInMemoryCommandDispatcher()` method:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddCommandHandlers()
                        .AddInMemoryCommandDispatcher();

    //other registrations    
    return builder.Build();
}
```

Then simply inject `ICommandDispatcher` into a class and call `DispatchAsync()` method:

``` cs
public class AccountsService
{
    private readonly ICommandDispatcher _dispatcher;

    public AccountsService(ICommandDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    } 

    public Task CreateAccountAsync(CreateAccount command)
        => _dispatcher.DispatchAsync(command);
}
```

## Queries

### Overview

Adds an ability to create and process queries in the sense of [CQRS](https://martinfowler.com/bliki/CQRS.html).

### Usage

Implement `IQuery<TResult>` interface in the selected class:

``` cs
public class GetAccount : IQuery<AccountDto>
{
    public Guid Id { get; set; }
}
```

Create dedicated query handler class that implements `IQueryHandler<TQuery, TResult>` interface with `HandleAsync()` method:

``` cs
public class GetAccountHandler : IQueryHandler<GetAccount, AccountDto>
{
    public Task<AccountDto> HandleAsync(GetAccount query)
    {
        //put the handling code here
    }
}
```

You can easily register all query handlers in DI container by calling `AddQueryHandlers()` method on `IGenocsBuilder`:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddQueryHandlers();

    //other registrations    
    return builder.Build();
}
```

Dispatching a particular query object can be also done using `Genocs.Common` package. Start with registering in-memory dispatcher on your `IGenocsBuilder` by calling a `AddInMemoryQueryDispatcher()` method:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddQueryHandlers()
                        .AddInMemoryQueryDispatcher();

    //other registrations    
    return builder.Build();
}
```

Then simply inject `IQueryDispatcher` into a class and call `DispatchAsync()` method:

``` cs
public class AccountsService
{
    private readonly IQueryDispatcher _dispatcher;

    public AccountsService(IQueryDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    } 

    public Task<AccountDto> GetAccountAsync(Guid id)
        => _dispatcher.DispatchAsync(new GetAccount { Id = id });
}
```

## Events

### Overview

Adds ability to create and process events in the sense of [CQRS](https://martinfowler.com/bliki/CQRS.html).

### Usage

Implement `IEvent` or `IRejectedEvent` (marker) interface in the selected class. Since the event represents something that already happened, you should follow the convention:

- keep all the events immutable
- name of your events should kept in the past tense

``` cs
public class AccountCreated : IEvent
{
    public Guid Id { get; }

    public AccountCreated(id)
    {
        Id = id;
    }
}
```

Create dedicated event handler class that implements `IEventHandler<TEvent>` interface with `HandleAsync()` method:

``` cs
public class AccountCreatedHandler : IEventHandler<AccountCreated>
{
    public Task HandleAsync(AccountCreated @event)
    {
        //put the handling code here
    }
}
```

You can easily register all event handlers in DI container by calling `AddEventHandlers()` method on `IGenocsBuilder`:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddEventHandlers();

    //other registrations    
    return builder.Build();
}
```

Dispatching a particular event object can be also done using `Genocs.Common` package. Start with registering in-memory dispatcher on your `IGenocsBuilder` by calling a `AddInMemoryEventDispatcher()` method:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    var builder = services
                        .AddGenocs()
                        .AddCommandHandlers()
                        .AddInMemoryEventDispatcher();

    //other registrations    
    return builder.Build();
}
```

Then simply inject `IEventDispatcher` into a class and call `DispatchAsync()` method:

``` cs
public class AccountsService
{
    private readonly IEventDispatcher _dispatcher;

    public AccountsService(IEventDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    } 

    public Task PostProcessAccountCreation(AccountCreated @event)
        => _dispatcher.DispatchAsync(@event);
}
```
