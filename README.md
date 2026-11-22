# Rohit Malla — Portfolio

Personal UX portfolio: a home page and six case studies.

## Structure

```
index.html                         home page
E9_Community.html                  case study
Equip9_AI.html                     case study
KonnectNXT_SaaS.html               case study
konnectnxt_Webpage_and_Logo.html   case study
Linger.html                        case study
RoTorrent.html                     case study
media/                             images, résumé PDF, 3D model (hero-model.glb + texture)
```

## Publishing

Push this folder to a GitHub repository and turn on **Settings → Pages → Deploy from a branch** (root folder).

## Viewing locally

Browsers block the 3D model from loading when pages are opened straight from disk. To preview locally, serve the folder instead:

```
python3 -m http.server
```

then open http://localhost:8000.
