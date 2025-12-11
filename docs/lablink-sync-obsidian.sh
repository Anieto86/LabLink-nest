#!/bin/bash
# LabLink → Obsidian Sync Script (unificado)
# Sincroniza código, docs y templates desde LabLink a Obsidian vault

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

LABLINK_DIR="/c/Users/alvar/Documents/LabLink-node"
OBSIDIAN_DIR="/c/Users/alvar/Documents/Obsidian-syc-git/Projects/LabLink"

echo -e "${BLUE}🔄 Sincronizando LabLink → Obsidian...${NC}"

# Función para sincronizar directorio
sync_dir() {
    local source_dir=$1
    local target_dir=$2
    local dir_name=$3

    echo -e "${YELLOW}📁 Sincronizando $dir_name...${NC}"

    # Eliminar directorio anterior si existe
    if [ -d "$target_dir" ]; then
        rm -rf "$target_dir"
    fi

    # Copiar directorio completo
    cp -r "$source_dir" "$target_dir"

    echo -e "${GREEN}✅ $dir_name actualizado${NC}"
}

# Sincronizar directorios principales
sync_dir "$LABLINK_DIR/src" "$OBSIDIAN_DIR/src" "Source Code"
sync_dir "$LABLINK_DIR/docs" "$OBSIDIAN_DIR/docs" "Documentation"
sync_dir "$LABLINK_DIR/docs/obsidian-Lablink" "$OBSIDIAN_DIR/obsidian-Lablink" "Obsidian Templates"

# Copiar archivos importantes
echo -e "${YELLOW}📄 Copiando archivos importantes...${NC}"
cp "$LABLINK_DIR/package.json" "$OBSIDIAN_DIR/"
cp "$LABLINK_DIR/README.md" "$OBSIDIAN_DIR/Project-README.md"
cp "$LABLINK_DIR/tsconfig.json" "$OBSIDIAN_DIR/"

# Actualizar timestamp
echo "⏰ Última sincronización: $(date)" > "$OBSIDIAN_DIR/last-sync.txt"

# Contar archivos markdown sincronizados
file_count=$(find "$LABLINK_DIR/docs/obsidian-Lablink" -name "*.md" | wc -l)
echo -e "${GREEN}📄 Synced $file_count markdown files${NC}"

# Auto-commit opcional
read -p "🤖 Auto-commit to Obsidian git? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$OBSIDIAN_DIR/.."
    git add .
    git commit -m "Sync LabLink personal docs: $(date '+%Y-%m-%d %H:%M')"
    git push
    echo -e "${GREEN}🚀 Pushed to Obsidian repository${NC}"
fi

echo -e "${BLUE}🎯 Sincronización completa! Archivos en: $OBSIDIAN_DIR${NC}"
echo -e "${YELLOW}💡 Tip: Usa 'pnpm sync:obsidian' para ejecutar este script${NC}"
