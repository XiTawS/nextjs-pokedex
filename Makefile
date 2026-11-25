# Raccourcis du projet : `make` seul affiche la liste.
.DEFAULT_GOAL := help
.PHONY: help install dev build start lint check clean

help: ## Affiche cette aide
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "  make %-8s %s\n", $$1, $$2}'

install: ## Installe les dépendances et active les hooks Git
	npm install

dev: ## Lance le serveur de développement (http://localhost:3000)
	npm run dev

build: ## Construit la version de production
	npm run build

start: build ## Construit puis sert la version de production
	npm start

lint: ## Vérifie le code avec ESLint
	npm run lint

check: lint build ## Lint et build, comme la CI

clean: ## Supprime le cache de build (.next)
	rm -rf .next
