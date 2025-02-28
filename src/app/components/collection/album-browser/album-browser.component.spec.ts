import { Observable, Subject } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';
import { AlbumData } from '../../../common/data/entities/album-data';
import { FileSystem } from '../../../common/io/file-system';
import { Logger } from '../../../common/logger';
import { MouseSelectionWatcher } from '../../../common/mouse-selection-watcher';
import { NativeElementProxy } from '../../../common/native-element-proxy';
import { AlbumModel } from '../../../services/album/album-model';
import { BaseApplicationService } from '../../../services/application/base-application.service';
import { BasePlaybackService } from '../../../services/playback/base-playback.service';
import { BaseTranslatorService } from '../../../services/translator/base-translator.service';
import { AlbumOrder } from '../album-order';
import { BaseAlbumsPersister } from '../base-albums-persister';
import { AlbumBrowserComponent } from './album-browser.component';
import { AlbumRowsGetter } from './album-rows-getter';

describe('AlbumBrowserComponent', () => {
    let playbackServiceMock: IMock<BasePlaybackService>;
    let applicationServiceMock: IMock<BaseApplicationService>;
    let albumRowsGetterMock: IMock<AlbumRowsGetter>;
    let nativeElementProxyMock: IMock<NativeElementProxy>;
    let translatorServiceMock: IMock<BaseTranslatorService>;
    let mouseSelectionWatcherMock: IMock<MouseSelectionWatcher>;
    let fileSystemMock: IMock<FileSystem>;
    let loggerMock: IMock<Logger>;
    let albumsPersisterMock: IMock<BaseAlbumsPersister>;
    let component: AlbumBrowserComponent;
    let windowSizeChanged: Subject<void>;
    let mouseButtonReleased: Subject<void>;
    let windowSizeChanged$: Observable<void>;
    let mouseButtonReleased$: Observable<void>;

    beforeEach(() => {
        playbackServiceMock = Mock.ofType<BasePlaybackService>();
        applicationServiceMock = Mock.ofType<BaseApplicationService>();
        albumRowsGetterMock = Mock.ofType<AlbumRowsGetter>();
        nativeElementProxyMock = Mock.ofType<NativeElementProxy>();
        translatorServiceMock = Mock.ofType<BaseTranslatorService>();
        mouseSelectionWatcherMock = Mock.ofType<MouseSelectionWatcher>();
        fileSystemMock = Mock.ofType<FileSystem>();
        loggerMock = Mock.ofType<Logger>();
        albumsPersisterMock = Mock.ofType<BaseAlbumsPersister>();
        windowSizeChanged = new Subject();
        mouseButtonReleased = new Subject();
        windowSizeChanged$ = windowSizeChanged.asObservable();
        mouseButtonReleased$ = mouseButtonReleased.asObservable();
        applicationServiceMock.setup((x) => x.windowSizeChanged$).returns(() => windowSizeChanged$);
        applicationServiceMock.setup((x) => x.mouseButtonReleased$).returns(() => mouseButtonReleased$);
        component = new AlbumBrowserComponent(
            playbackServiceMock.object,
            applicationServiceMock.object,
            albumRowsGetterMock.object,
            nativeElementProxyMock.object,
            mouseSelectionWatcherMock.object,
            loggerMock.object
        );
    });

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act

            // Assert
            expect(component).toBeDefined();
        });

        it('should define albumOrderEnum', () => {
            // Arrange

            // Act

            // Assert
            expect(component.albumOrderEnum).toBeDefined();
        });

        it('should define albumRows as empty', () => {
            // Arrange

            // Act

            // Assert
            expect(component.albumRows).toBeDefined();
            expect(component.albumRows.length).toEqual(0);
        });

        it('should declare albumBrowserElement', () => {
            // Arrange

            // Act

            // Assert
            expect(component.albumBrowserElement).toBeUndefined();
        });

        it('should declare selectedAlbumOrder', () => {
            // Arrange

            // Act

            // Assert
            expect(component.selectedAlbumOrder).toBeUndefined();
        });

        it('should declare albumsPersister', () => {
            // Arrange

            // Act

            // Assert
            expect(component.albumsPersister).toBeUndefined();
        });

        it('should define playbackService', () => {
            // Arrange

            // Act

            // Assert
            expect(component.playbackService).toBeDefined();
        });
    });

    describe('albums', () => {
        it('should set and get the albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();

            // Act
            component.albums = albums;

            // Assert
            expect(component.albums).toBe(albums);
        });

        it('should initialize mouseSelectionWatcher using albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();

            // Act
            component.albums = albums;

            // Assert
            mouseSelectionWatcherMock.verify((x) => x.initialize(albums, false), Times.exactly(1));
        });

        it('should order the albums if albumsPersister is not undefined', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;

            // Act
            component.albums = albums;

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(It.isAny(), albums, AlbumOrder.byAlbumArtist), Times.exactly(1));
        });

        it('should not order the albums if albumsPersister is undefined', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;

            // Act
            component.albums = albums;

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(It.isAny(), It.isAny(), It.isAny()), Times.never());
        });

        it('should apply the selected albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            albumData1.albumKey = 'albumKey1';
            const albumData2: AlbumData = new AlbumData();
            albumData2.albumKey = 'albumKey2';
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            albumsPersisterMock.setup((x) => x.getSelectedAlbums(albums)).returns(() => [album2]);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();

            // Act
            component.albums = albums;

            // Assert
            expect(albums[0].isSelected).toBeFalsy();
            expect(albums[1].isSelected).toBeTruthy();
        });
    });

    describe('ngAfterViewInit', () => {
        it('should fill the album rows using the current element width', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            albumRowsGetterMock.reset();

            // Act
            jest.useFakeTimers();
            component.ngAfterViewInit();
            jest.runAllTimers();

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(500, albums, AlbumOrder.byAlbumArtist), Times.exactly(1));
        });
    });

    describe('ngOnInit', () => {
        it('should fill the album rows on window size changed if the available width has changed', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            component.ngOnInit();
            albumRowsGetterMock.reset();

            // Act
            windowSizeChanged.next();

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(500, albums, AlbumOrder.byAlbumArtist), Times.exactly(1));
        });

        it('should not fill the album rows on window size changed if the available width has not changed', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 0);
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            component.ngOnInit();
            albumRowsGetterMock.reset();

            // Act
            windowSizeChanged.next();

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(It.isAny(), albums, AlbumOrder.byAlbumArtist), Times.never());
        });

        it('should fill the album rows on mouse button released if the available width has changed', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            component.ngOnInit();
            albumRowsGetterMock.reset();

            // Act
            mouseButtonReleased.next();

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(500, albums, AlbumOrder.byAlbumArtist), Times.exactly(1));
        });

        it('should not fill the album rows on mouse button released if the available width has not changed', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 0);
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            component.ngOnInit();
            albumRowsGetterMock.reset();
            // Act
            mouseButtonReleased.next();
            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(It.isAny(), albums, AlbumOrder.byAlbumArtist), Times.never());
        });
    });

    describe('setSelectedAlbums', () => {
        it('should set the selected items on mouseSelectionWatcher', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const event: any = {};
            component.albumsPersister = albumsPersisterMock.object;

            // Act
            component.setSelectedAlbums(event, album1);

            // Assert
            mouseSelectionWatcherMock.verify((x) => x.setSelectedItems(event, album1), Times.exactly(1));
        });

        it('should persist the selected albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            const event: any = {};
            mouseSelectionWatcherMock.setup((x) => x.selectedItems).returns(() => albums);
            component.albumsPersister = albumsPersisterMock.object;

            // Act
            component.setSelectedAlbums(event, album1);

            // Assert
            albumsPersisterMock.verify((x) => x.setSelectedAlbums(albums), Times.exactly(1));
        });
    });

    describe('toggleAlbumOrder', () => {
        it('should change AlbumOrder from byAlbumTitleAscending to byAlbumTitleDescending', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumTitleAscending;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byAlbumTitleDescending);
        });

        it('should change AlbumOrder from byAlbumTitleDescending to byDateAdded', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumTitleDescending;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byDateAdded);
        });

        it('should change AlbumOrder from byDateAdded to byDateCreated', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byDateAdded;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byDateCreated);
        });

        it('should change AlbumOrder from byDateCreated to byAlbumArtist', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byDateCreated;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byAlbumArtist);
        });

        it('should change AlbumOrder from byAlbumArtist to byYearAscending', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byYearAscending);
        });

        it('should change AlbumOrder from byYearAscending to byYearDescending', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byYearAscending;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byYearDescending);
        });

        it('should change AlbumOrder from byYearDescending to byLastPlayed', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;
            component.selectedAlbumOrder = AlbumOrder.byYearDescending;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byLastPlayed);
        });

        it('should change AlbumOrder from byLastPlayed to byAlbumTitleAscending', () => {
            // Arrange
            component.selectedAlbumOrder = AlbumOrder.byLastPlayed;
            component.albumsPersister = albumsPersisterMock.object;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byAlbumTitleAscending);
        });

        it('should fill the album rows', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();
            component.albums = albums;
            albumRowsGetterMock.reset();

            // Act
            component.toggleAlbumOrder();

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(It.isAny(), albums, AlbumOrder.byYearAscending), Times.exactly(1));
        });

        it('should apply the selected albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            albumData1.albumKey = 'albumKey1';
            const albumData2: AlbumData = new AlbumData();
            albumData2.albumKey = 'albumKey2';
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            albumsPersisterMock.setup((x) => x.getSelectedAlbums(albums)).returns(() => [album2]);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();
            component.albums = albums;
            albums[0].isSelected = false;
            albums[1].isSelected = false;

            // Act
            component.toggleAlbumOrder();

            // Assert
            expect(albums[0].isSelected).toBeFalsy();
            expect(albums[1].isSelected).toBeTruthy();
        });

        it('should persist the selected album order', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.albumsPersister = albumsPersisterMock.object;
            component.ngOnInit();
            component.albums = albums;
            albumRowsGetterMock.reset();

            // Act
            component.toggleAlbumOrder();

            // Assert
            albumsPersisterMock.verify((x) => x.setSelectedAlbumOrder(AlbumOrder.byYearAscending), Times.exactly(1));
        });
    });

    describe('albumsPersister', () => {
        it('should set and return albumsPersister', () => {
            // Arrange
            component.albumsPersister = albumsPersisterMock.object;

            // Act
            const persister: BaseAlbumsPersister = component.albumsPersister;

            // Assert
            expect(persister).toBe(albumsPersisterMock.object);
        });

        it('should set the selected album order', () => {
            // Arrange
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            albumsPersisterMock.reset();
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumTitleAscending);

            // Act
            component.albumsPersister = albumsPersisterMock.object;

            // Assert
            expect(component.selectedAlbumOrder).toEqual(AlbumOrder.byAlbumTitleAscending);
        });

        it('should fill the album rows using the current element width', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            const albumData2: AlbumData = new AlbumData();
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            albumsPersisterMock.reset();
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumTitleAscending);
            component.albums = albums;
            component.albumBrowserElement = { nativeElement: {} };
            albumRowsGetterMock.reset();

            jest.useFakeTimers();
            component.ngAfterViewInit();
            jest.runAllTimers();

            // Act
            component.albumsPersister = albumsPersisterMock.object;

            // Assert
            albumRowsGetterMock.verify((x) => x.getAlbumRows(500, albums, AlbumOrder.byAlbumTitleAscending), Times.exactly(1));
        });

        it('should apply the selected albums', () => {
            // Arrange
            const albumData1: AlbumData = new AlbumData();
            albumData1.albumKey = 'albumKey1';
            const albumData2: AlbumData = new AlbumData();
            albumData2.albumKey = 'albumKey2';
            const album1: AlbumModel = new AlbumModel(albumData1, translatorServiceMock.object, fileSystemMock.object);
            const album2: AlbumModel = new AlbumModel(albumData2, translatorServiceMock.object, fileSystemMock.object);
            const albums: AlbumModel[] = [album1, album2];
            nativeElementProxyMock.setup((x) => x.getElementWidth(It.isAny())).returns(() => 500);
            component = new AlbumBrowserComponent(
                playbackServiceMock.object,
                applicationServiceMock.object,
                albumRowsGetterMock.object,
                nativeElementProxyMock.object,
                mouseSelectionWatcherMock.object,
                loggerMock.object
            );
            albumsPersisterMock.setup((x) => x.getSelectedAlbumOrder()).returns(() => AlbumOrder.byAlbumArtist);
            albumsPersisterMock.setup((x) => x.getSelectedAlbums(albums)).returns(() => [album2]);
            component.selectedAlbumOrder = AlbumOrder.byAlbumArtist;
            component.ngOnInit();
            component.albums = albums;
            albums[0].isSelected = false;
            albums[1].isSelected = false;

            // Act
            component.albumsPersister = albumsPersisterMock.object;

            // Assert
            expect(albums[0].isSelected).toBeFalsy();
            expect(albums[1].isSelected).toBeTruthy();
        });
    });
});
