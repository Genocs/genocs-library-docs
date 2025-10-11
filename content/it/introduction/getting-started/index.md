---
title: "Guida Introduttiva"
description: "Iniziamo con la Libreria Genocs!"
lead: "Iniziamo con la Libreria Genocs!"
date: 2023-05-13T15:40:19+02:00
lastmod: 2025-10-11T15:34:50Z
draft: false
images: []
menu:
  introduction:
    identifier: "basics-getting-started"
    name: "Guida Introduttiva"
    parent: "introduction"
weight: 1
toc: true
---
<div>

{{< img src="gnx-enterprise-library.png" >}}

## Definizione del Problema

<p>Hai mai provato il dolore di impostare un nuovo progetto da zero ogni volta?</p>
<p><b>La Libreria Genocs</b> mira ad
affrontare questo punto dolente offrendo punti di partenza per varie tecnologie che possono aiutare a risparmiare
ore di sviluppo e tempo di ricerca per sviluppatori e team.</p>

## Soluzione

<p><b>La Libreria Genocs</b> offre un framework di librerie, cli e template con i pacchetti e servizi più recenti di cui i vostri progetti avranno mai bisogno. Intendiamo fornire Template puliti e ben strutturati di qualità eccellente seguendo pratiche di codifica standard e principi di Clean Architecture che rendono la vostra esperienza di sviluppo senza problemi.

</p>

## Caratteristiche Principali

- 🏗️ **Architettura Pulita**: Tutti i template seguono i principi della Clean Architecture
- 🚀 **Tecnologie Moderne**: Utilizziamo le ultime versioni di framework e librerie
- 🔧 **Tool CLI**: Strumenti da riga di comando per velocizzare lo sviluppo
- 📚 **Documentazione Completa**: Guide dettagliate e esempi
- 🌐 **Cloud-Agnostic**: Funziona con qualsiasi provider cloud
- 🔒 **Sicurezza Integrata**: Best practice di sicurezza incluse di default

## Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) o superiore
- [Git](https://git-scm.com/downloads)
- Un editor di codice come [Visual Studio](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)

## Installazione Rapida

### 1. Installa il CLI Tool

```bash
dotnet tool install --global Genocs.CLI
```

### 2. Crea un Nuovo Progetto

```bash
genocs create webapi MyProject
```

### 3. Naviga nella Directory del Progetto

```bash
cd MyProject
```

### 4. Esegui il Progetto

```bash
dotnet run
```

Il tuo progetto sarà disponibile all'indirizzo `https://localhost:5001`!

## Prossimi Passi

- Esplora la [Documentazione](/it/docs/) per guide dettagliate
- Scopri i [Template](/it/templates/) disponibili
- Impara come usare la [Libreria](/it/library/) nei tuoi progetti
