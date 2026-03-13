#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# sync-design-system.sh
#
# Two-way sync between ux-prototypes and bw-design-system.
#
# Usage:
#   ./sync-design-system.sh pull              # pull design system INTO this project
#   ./sync-design-system.sh push              # push custom components TO design system
#   ./sync-design-system.sh                   # defaults to pull
#   ./sync-design-system.sh pull /custom/path # use a custom bw-design-system path
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ACTION="${1:-pull}"

# Allow path as 2nd arg, or 1st arg if it's a path (backwards compat)
if [ -d "$ACTION" ]; then
  DS_PATH="$ACTION"
  ACTION="pull"
elif [ "${2:-}" != "" ]; then
  DS_PATH="$2"
else
  DS_PATH="$SCRIPT_DIR/../bw-design-system"
fi

# Verify design system exists
if [ ! -d "$DS_PATH/src/theme" ]; then
  echo "Error: Cannot find bw-design-system at $DS_PATH"
  echo "Usage: $0 [pull|push] [path-to-bw-design-system]"
  exit 1
fi

case "$ACTION" in
  pull)
    echo "Pulling design system from: $DS_PATH"
    echo ""

    echo "  src/theme/ ..."
    rsync -av --delete \
      --exclude='*.tsbuildinfo' \
      "$DS_PATH/src/theme/" "$SCRIPT_DIR/src/theme/"

    echo ""
    echo "  src/components/ ..."
    rsync -av --delete \
      --exclude='*.tsbuildinfo' \
      "$DS_PATH/src/components/" "$SCRIPT_DIR/src/components/"

    echo ""
    echo "  public/fonts/ ..."
    rsync -av --delete \
      "$DS_PATH/public/fonts/" "$SCRIPT_DIR/public/fonts/"

    echo ""
    echo "Done! Run 'npm run build' to verify everything compiles."
    ;;

  push)
    CUSTOM_DIR="$SCRIPT_DIR/src/custom-components"

    if [ ! -d "$CUSTOM_DIR" ] || [ -z "$(ls -A "$CUSTOM_DIR"/*.tsx 2>/dev/null)" ]; then
      echo "No .tsx files found in src/custom-components/"
      exit 0
    fi

    echo "Pushing custom components to: $DS_PATH"
    echo ""

    # Copy each .tsx file (skip README)
    for file in "$CUSTOM_DIR"/*.tsx; do
      filename="$(basename "$file")"
      echo "  $filename → src/components/$filename"
      cp "$file" "$DS_PATH/src/components/$filename"
    done

    echo ""
    echo "Done! Components copied to bw-design-system/src/components/."
    echo "Next steps in bw-design-system:"
    echo "  1. Register the component in src/showcase/register-components.tsx"
    echo "  2. Run 'npm run build' to verify"
    echo "  3. Commit and push"
    ;;

  *)
    echo "Unknown action: $ACTION"
    echo "Usage: $0 [pull|push] [path-to-bw-design-system]"
    exit 1
    ;;
esac
