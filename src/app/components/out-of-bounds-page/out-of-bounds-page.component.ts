import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-out-of-bounds-page',
    imports: [CommonModule, NavBarComponent, FooterComponent],
    templateUrl: './out-of-bounds-page.component.html',
    styleUrl: './out-of-bounds-page.component.scss'
})
export class OutOfBoundsPageComponent {

    coins = 0;
    coinsPerClick = 1;
    autoCoins = 0;

    gameStarted = false;

    constructor() {
        setInterval(() => this.coins += this.autoCoins, 1000); // Auto-farm every second
    }

    clickCookie() {
        this.coins += this.coinsPerClick;
    }

    buyClickUpgrade() {
        const cost = 50;
        if (this.coins >= cost) {
            this.coins -= cost;
            this.coinsPerClick++;
        }
    }

    buyAutoUpgrade() {
        const cost = 100;
        if (this.coins >= cost) {
            this.coins -= cost;
            this.autoCoins++;
        }
    }
}
