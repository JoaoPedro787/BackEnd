import { updateContent, buttonSwap } from './domUtils.js';

const Page = {
    async init() { 
        try {
            await updateContent();
            await buttonSwap();
        } catch (error) {
            console.error('Error initializing page:', error);
        }
    }
};

Page.init();