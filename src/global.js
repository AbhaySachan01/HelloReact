// 🌐 Fiber Tree States (Private)
let wipRoot = null;
let currentRoot = null;
let nextRender = null;
let wipFiber = null;
let deletions = [];
let hookIndex = 0;
let nextUnitOfWork = null;


// console.log("🧠 global.js loaded once");


// 🌟 Effect Tags
export const PLACEMENT = "PLACEMENT";
export const UPDATE = "UPDATE";
export const DELETION = "DELETION";

// ✅ Getters
export const getWipRoot = () => wipRoot;
export const getCurrentRoot = () => currentRoot;
export const getNextRender = () => nextRender;
export const getWipFiber = () => wipFiber;
export const getHookIndex = () => hookIndex;
export const getNextUnitOfWork = () => nextUnitOfWork;
export const getDeletions = () => deletions;

// ✅ Setters
export const setWipRoot = (val) => { wipRoot = val; };
export const setCurrentRoot = (val) => { currentRoot = val; };
export const setNextRender = (val) => { nextRender = val; };
export const setWipFiber = (val) => { wipFiber = val; };
export const setHookIndex = (val) => { hookIndex = val; };
export const setNextUnitOfWork = (val) => { nextUnitOfWork = val; };
export const setDeletions = (list) => { deletions = list; };

// ✅ Deletion Helpers
export const addDeletion = (fiber) => { deletions.push(fiber); };
export const clearDeletions = () => { deletions.length=0; };
 