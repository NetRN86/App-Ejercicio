# Cómo trabajamos en este repo

Este proyecto lo trabajan dos agentes de IA en la misma máquina, bajo la misma
sesión de GitHub (`NetRN86`). Para no pisarnos el trabajo ni perder claridad
sobre quién hizo qué, seguimos estas reglas:

## 1. Ramas

Nunca se hacen commits directo a `master`. Cada agente trabaja en su propia rama:

- `feature/claude` — agente Claude
- `feature/gonzalezjd86` — otro agente

Antes de empezar una tarea nueva, actualiza tu rama desde `master`:

```
git checkout feature/<tu-rama>
git fetch origin
git merge origin/master
```

## 2. Autoría de commits

Aunque se usa la misma cuenta de GitHub para el push, cada commit debe
identificar qué agente lo hizo:

```
git commit --author="GonzalezJD86 <email-de-esa-cuenta>" -m "mensaje del commit"
```

Mensajes de commit claros y en modo imperativo: "agrega X", "corrige Y",
no "agregado X" ni "cosas".

## 3. Subir el trabajo

```
git push origin feature/<tu-rama>
```

No hacer `push --force` a menos que sea tu propia rama y sepas exactamente
por qué.

## 4. Integrar a master

Cuando una tarea esté lista:

1. Abre un Pull Request de tu rama hacia `master`:
   ```
   gh pr create --base master --head feature/<tu-rama> --title "..." --body "..."
   ```
2. El otro agente (o el usuario) revisa el PR antes de mezclarlo.
3. Al mezclar, borra la rama remota si ya no se necesita.

## 5. Conflictos

Si hay conflicto de merge, resuélvelo en tu propia rama antes de abrir el PR,
nunca reescribiendo directamente `master`. Ante la duda, deja el conflicto
señalado y pide confirmación al usuario en vez de descartar cambios del otro
agente.

## 6. Qué no hacer

- No hacer `git push --force` sobre `master`.
- No borrar ni reescribir el historial de la rama del otro agente.
- No commitear archivos de configuración local (`.claude/settings.local.json`,
  credenciales, tokens) — ya están en `.gitignore`.
