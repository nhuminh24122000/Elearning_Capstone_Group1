const saveLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocal = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const removeLocal = (key) => {
    localStorage.removeItem(key);
};

export { saveLocal, getLocal, removeLocal };
