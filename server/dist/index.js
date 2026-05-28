"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const timezone = 'Asia/Kolkata';
function getTodayRateSnapshot() {
    const now = new Date();
    return {
        currentDate: new Intl.DateTimeFormat('en-CA', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(now),
        currentTime: new Intl.DateTimeFormat('en-GB', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(now),
        timezone,
        goldRate: {
            metal: 'Gold',
            purity: '24K',
            unit: 'INR / 10g',
            price: 98750,
        },
        silverRate: {
            metal: 'Silver',
            purity: '999',
            unit: 'INR / kg',
            price: 108500,
        },
        source: 'sample-data',
    };
}
app.get('/', (_request, response) => {
    response.json({
        message: 'Sample rate server is running',
        data: getTodayRateSnapshot(),
    });
});
app.get('/rates/today', (_request, response) => {
    response.json(getTodayRateSnapshot());
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
