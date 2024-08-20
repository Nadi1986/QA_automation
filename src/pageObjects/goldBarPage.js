const Page = require('./pageObjects');
const config = require('./env');

class GoldBarPage {
    constructor() {
        this.page = new Page();
    }

    async findFakeGoldBar() {
        await this.page.init();
        await this.page.navigate(config.baseUrl);

        const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let fakeGroup;

        // Divide into three groups of three bars
        let group1 = bars.slice(0, 3);
        let group2 = bars.slice(3, 6);
        let group3 = bars.slice(6, 9);

        // First weighing: Group 1 vs Group 2
        const result1 = await this.weighBars(group1, group2);

        if (result1.includes('left')) {
            fakeGroup = group1;
        } else if (result1.includes('right')) {
            fakeGroup = group2;
        } else {
            fakeGroup = group3;
        }

        // Narrow down to find the fake bar within the fake group
        let fakeBar;

        const [bar1, bar2, bar3] = fakeGroup;
        const result2 = await this.weighBars([bar1], [bar2]);

        if (result2.includes('left')) {
            fakeBar = bar1;
        } else if (result2.includes('right')) {
            fakeBar = bar2;
        } else {
            fakeBar = bar3;
        }

        // Click on the identified fake bar
        await this.page.clickFakeBar(fakeBar);
        // Get the alert message
        const alertMessage = await this.page.getAlertMessage();
        console.log(`Alert: ${alertMessage}`);

        // Get and print the list of weighings
        const weighings = await this.page.getWeighings();
        console.log('Weighings:', weighings);

        await this.page.close();
    }

    async weighBars(left, right) {
        await this.page.fillLeftBowl(left);
        await this.page.fillRightBowl(right);
        await this.page.clickWeigh();
        const result = await this.page.getWeighResult();
        await this.page.clickReset();
        return result;
    }
}

module.exports = GoldBarPage;