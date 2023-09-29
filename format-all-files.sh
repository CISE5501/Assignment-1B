# Format frontend
cd frontend
npm run format
cd ..

# Format backend
cd backend
npm run format
cd ..

# Commit
git add .
git commit -m "Reformat all files with prettier"
