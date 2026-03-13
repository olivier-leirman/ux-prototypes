#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# sync-design-system.sh
#
# Syncs theme + shared components from the bw-design-system repo into
# this project. Run whenever the design system is updated.
#
# Usage:
#   ./sync-design-system.sh              # uses default sibling path
#   ./sync-design-system.sh /path/to/bw-design-system
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE="${1:-$SCRIPT_DIR/../bw-design-system}"

# Verify source exists
if [ ! -d "$SOURCE/src/theme" ]; then
  echo "Error: Cannot find bw-design-system at $SOURCE"
  echo "Usage: $0 [path-to-bw-design-system]"
  exit 1
fi

echo "Syncing design system from: $SOURCE"
echo ""

# Sync theme (tokens, overrides, types, brand context, etc.)
echo "  src/theme/ ..."
rsync -av --delete \
  --exclude='*.tsbuildinfo' \
  "$SOURCE/src/theme/" "$SCRIPT_DIR/src/theme/"

# Sync shared components (Icon, SearchField, ToggleChip, etc.)
echo ""
echo "  src/components/ ..."
rsync -av --delete \
  --exclude='*.tsbuildinfo' \
  "$SOURCE/src/components/" "$SCRIPT_DIR/src/components/"

# Sync fonts
echo ""
echo "  public/fonts/ ..."
rsync -av --delete \
  "$SOURCE/public/fonts/" "$SCRIPT_DIR/public/fonts/"

echo ""
echo "Done! Run 'npm run build' to verify everything compiles."
