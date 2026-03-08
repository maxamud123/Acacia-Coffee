const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readAll(collection) {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAll(collection, data) {
  fs.writeFileSync(getFilePath(collection), JSON.stringify(data, null, 2), 'utf-8');
}

function findById(collection, id) {
  return readAll(collection).find(item => item._id === id) || null;
}

function insert(collection, document) {
  const data = readAll(collection);
  data.unshift(document);
  writeAll(collection, data);
  return document;
}

function updateById(collection, id, updates) {
  const data = readAll(collection);
  const index = data.findIndex(item => item._id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  writeAll(collection, data);
  return data[index];
}

function deleteById(collection, id) {
  const data = readAll(collection);
  const filtered = data.filter(item => item._id !== id);
  if (filtered.length === data.length) return false;
  writeAll(collection, filtered);
  return true;
}

function clearAll(collection) {
  writeAll(collection, []);
}

module.exports = { readAll, insert, findById, updateById, deleteById, clearAll };
