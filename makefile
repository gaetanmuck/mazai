include .env
export


save: push
start: start-local
deploy: save upload start-vps



### CODEBASE ###

# Save local changes to GitHub
push:
	@echo "[mazai] > Pushing local changes to GitHub..."
	@git add . > /dev/null 2>&1 
	@git commit -m "update on $$(date '+%Y-%m-%d %H:%M:%S')" > /dev/null 2>&1 || true
	@git push origin main > /dev/null 2>&1

# Upload current codebase to VPS
upload:
	@echo "[mazai] > Uploading local codebase to VPS..."
	@rsync -avz --exclude='.git/' --exclude='__pycache__' --exclude='*.pyc'  --exclude='.DS_Store' . $(VPS_USER)@$(VPS_IP):~/mazai.dev > /dev/null 2>&1



### LOCAL START ###

# Install dependencies locally
install-local:
	@echo "[mazai] > Installing Web dependencies..."
	@pip install -r web/requirements.txt > /dev/null
	@echo "[mazai] > Installing API dependencies..."
	@pip install -r api/requirements.txt > /dev/null

# Start API locally
start-local-api:
	@echo "[mazai] > Starting API locally..."
	@uvicorn api.app.main:app --host 0.0.0.0 --port 8000 

# Start Web locally
start-local-web:
	@echo "[mazai] > Starting Web locally..."
	@cd client && python3.10 -m streamlit run app/main.py

# Start both API and Web locally
start-local:
	make -j2 start-local-api start-local-web


### VPS START ###
start-vps:
	@echo "[mazai] > Starting mazai.dev on VPS..."
	@ssh $(VPS_USER)@$(VPS_IP) "cd ~/mazai.dev && docker compose down && docker compose build && docker compose up -d  > /dev/null 2>&1"