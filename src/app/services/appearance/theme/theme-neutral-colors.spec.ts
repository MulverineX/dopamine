import { ThemeNeutralColors } from './theme-neutral-colors';

describe('ThemeNeutralColors', () => {
    function createNeutralColors(): ThemeNeutralColors {
        return new ThemeNeutralColors(
            'red',
            'green',
            'blue',
            'black',
            'white',
            '#aaa',
            '#bbb',
            '#ccc',
            '#ddd',
            '#eee',
            '#fff',
            '#111',
            '#222',
            '#333',
            '#444',
            '#555',
            '#666',
            '#777',
            '#888'
        );
    }

    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors).toBeDefined();
        });

        it('should set windowButtonIcon', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.windowButtonIcon).toEqual('red');
        });

        it('should set hoveredItemBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.hoveredItemBackground).toEqual('green');
        });

        it('should set selectedItemBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.selectedItemBackground).toEqual('blue');
        });

        it('should set tabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.tabText).toEqual('black');
        });

        it('should set selectedTabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.selectedTabText).toEqual('white');
        });

        it('should set mainBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.mainBackground).toEqual('#aaa');
        });

        it('should set headerBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.headerBackground).toEqual('#bbb');
        });

        it('should set footerBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.footerBackground).toEqual('#ccc');
        });

        it('should set sidePaneBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.sidePaneBackground).toEqual('#ddd');
        });

        it('should set primaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryText).toEqual('#eee');
        });

        it('should set secondaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryText).toEqual('#fff');
        });

        it('should set breadcrumbBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.breadcrumbBackground).toEqual('#111');
        });

        it('should set sliderBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.sliderBackground).toEqual('#222');
        });

        it('should set sliderThumbBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.sliderThumbBackground).toEqual('#333');
        });

        it('should set albumCoverLogo', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.albumCoverLogo).toEqual('#444');
        });

        it('should set albumCoverBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.albumCoverBackground).toEqual('#555');
        });

        it('should set albumInfoBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.albumInfoBackground).toEqual('#666');
        });

        it('should set paneSeparators', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.paneSeparators).toEqual('#777');
        });

        it('should set settingsSeparators', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.settingsSeparators).toEqual('#888');
        });
    });
});
