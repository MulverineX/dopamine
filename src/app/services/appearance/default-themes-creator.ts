import { Theme } from './theme/theme';
import { ThemeCoreColors } from './theme/theme-core-colors';
import { ThemeCreator } from './theme/theme-creator';
import { ThemeNeutralColors } from './theme/theme-neutral-colors';

export class DefaultThemesCreator {
    private creator: ThemeCreator = new ThemeCreator('Digimezzo', 'info@digimezzo.com');

    public createAllThemes(): Theme[] {
        const themes: Theme[] = [];
        themes.push(...this.createDopamineThemes());
        themes.push(this.createUbuntuTheme());
        themes.push(this.createManjaroTheme());

        return themes;
    }

    private createDopamineThemes(): Theme[] {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#5e5e5e',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
            '#666',
            '#fff',
            '#1a1a1a',
            '#111',
            '#111',
            '#171717',
            '#fff',
            '#5e5e5e',
            '#272727',
            '#999',
            '#fff',
            '#5e5e5e',
            '#202020',
            '#272727',
            'transparent',
            '#363636'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#838383',
            'rgba(0, 0, 0, 0.05)',
            'rgba(0, 0, 0, 0.1)',
            '#909090',
            '#000',
            '#f5f5f5',
            '#fdfdfd',
            '#fdfdfd',
            '#efefef',
            '#000',
            '#838383',
            '#dfdfdf',
            '#666',
            '#000',
            '#838383',
            '#cecece',
            '#dfdfdf',
            'transparent',
            '#d7d7d7'
        );

        const themes: Theme[] = [];

        themes.push(new Theme('Dopamine', this.creator, new ThemeCoreColors('#6260e3', '#3fdcdd', '#4883e0'), darkColors, lightColors));
        themes.push(new Theme('Zune', this.creator, new ThemeCoreColors('#f78f1e', '#ed008c', '#f0266f'), darkColors, lightColors));
        themes.push(new Theme('Beats', this.creator, new ThemeCoreColors('#98247f', '#e21839', '#e21839'), darkColors, lightColors));
        themes.push(new Theme('Naughty', this.creator, new ThemeCoreColors('#f5004a', '#9300ef', '#f5004a'), darkColors, lightColors));

        return themes;
    }

    private createUbuntuTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            'white',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
            '#7b7b7b',
            'white',
            '#2c2c2c',
            '#272727',
            '#272727',
            '#272727',
            'white',
            '#7b7b7b',
            '#373737',
            '#999',
            'white',
            '#5e5e5e',
            '#202020',
            '#373737',
            '#151515',
            '#151515'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            'black',
            'rgba(0, 0, 0, 0.05)',
            'rgba(0, 0, 0, 0.1)',
            '#8c8c8c',
            'black',
            'white',
            '#fafafa',
            '#fafafa',
            '#fafafa',
            'black',
            '#8c8c8c',
            '#e9e9e9',
            '#666',
            'black',
            '#838383',
            '#cecece',
            '#e9e9e9',
            '#dadada',
            '#dadada'
        );

        return new Theme('Ubuntu', this.creator, new ThemeCoreColors('#d94612', '#f9622d', '#e95420'), darkColors, lightColors);
    }

    private createManjaroTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            'white',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
            '#818181',
            'white',
            '#2d2d2d',
            '#313131',
            '#313131',
            '#313131',
            'white',
            '#818181',
            '#373737',
            '#999',
            'white',
            '#5e5e5e',
            '#272727',
            '#373737',
            '#1b1b1b',
            '#1b1b1b'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            'black',
            'rgba(0, 0, 0, 0.05)',
            'rgba(0, 0, 0, 0.1)',
            '#838383',
            'black',
            'white',
            '#fafafa',
            '#fafafa',
            '#fafafa',
            'black',
            '#838383',
            '#e7e7e7',
            '#666',
            'black',
            '#838383',
            '#cecece',
            '#e7e7e7',
            '#c7c7c7',
            '#c7c7c7'
        );

        return new Theme('Manjaro', this.creator, new ThemeCoreColors('#009378', '#2eae92', '#16a085'), darkColors, lightColors);
    }
}
