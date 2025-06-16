import { useEditorEngine } from '@/components/store/editor';
import { VARIANTS } from '@onlook/fonts';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { Input } from '@onlook/ui/input';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FontFamily } from './font-family';
import type { FontFile } from './font-files';
import UploadModal from './upload-modal';

const FontPanel = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const editorEngine = useEditorEngine();
    const fontManager = editorEngine.font;

    const handleClose = () => {
        editorEngine.state.brandTab = null;
    };

    const handleUploadFont = () => {
        setIsUploadModalOpen(true);
    };

    const handleFontUpload = async (fonts: FontFile[]) => {
        await fontManager.uploadFonts(fonts);
    };

    const performSearch = useCallback(
        async (value: string) => {
            if (value.length > 0) {
                setIsLoading(true);
                try {
                    await fontManager.searchFonts(value);
                } catch (error) {
                    console.error('Failed to search fonts:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [fontManager],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            performSearch(value);
        }, 300),
        [performSearch],
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchQuery('');
            inputRef.current?.blur();
        }
    };

    const handleLoadMore = async () => {
        if (isLoading || !fontManager.hasMoreFonts) {
            return;
        }

        setIsLoading(true);
        try {
            await fontManager.fetchNextFontBatch();
        } catch (error) {
            console.error('Failed to load more fonts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const uniqueSiteFonts = searchQuery ? fontManager.searchResults : fontManager.systemFonts;

    return (
        <div
            className="flex flex-col h-full text-xs text-active flex-grow w-full p-0"
            data-oid="29x1a5:"
        >
            {/* Header Section */}
            <div
                className="flex justify-between items-center pl-4 pr-2.5 py-1.5 border-b border-border"
                data-oid="fun1zc:"
            >
                <h2 className="text-sm font-normal text-foreground" data-oid="uh.zttl">
                    Fonts
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md hover:bg-background-secondary"
                    onClick={handleClose}
                    data-oid="91z1766"
                >
                    <Icons.CrossS className="h-4 w-4" data-oid="7-1m3cs" />
                </Button>
            </div>

            {/* Search Bar - Fixed below header */}
            <div className="px-4 py-3 border-b border-border" data-oid="e7cqcck">
                <div className="relative" data-oid="5p:g00n">
                    <Icons.MagnifyingGlass
                        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
                        data-oid="ztfplfd"
                    />

                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a new font..."
                        className="h-9 text-xs pl-7 pr-8"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        data-oid="ifkdbil"
                    />

                    {searchQuery && (
                        <button
                            className="absolute right-[1px] top-[1px] bottom-[1px] aspect-square hover:bg-background-onlook active:bg-transparent flex items-center justify-center rounded-r-[calc(theme(borderRadius.md)-1px)] group"
                            onClick={() => handleSearch('')}
                            data-oid="5jlghwf"
                        >
                            <Icons.CrossS
                                className="h-3 w-3 text-foreground-primary/50 group-hover:text-foreground-primary"
                                data-oid="dusw-_x"
                            />
                        </button>
                    )}
                    {isLoading && searchQuery && (
                        <div
                            className="absolute right-9 top-1/2 -translate-y-1/2"
                            data-oid="q77h605"
                        >
                            <Icons.Shadow
                                className="h-4 w-4 animate-spin text-muted-foreground"
                                data-oid="sadj5nu"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex flex-col flex-1 overflow-y-auto" data-oid="xgmc02k">
                {/* System Fonts Section */}
                {searchQuery === '' && (
                    <div
                        className="flex flex-col gap-1 pt-6 pb-3 border-b border-border"
                        data-oid="td.130n"
                    >
                        {/* System Fonts Header */}
                        <div className="px-4" data-oid="lqcbvw1">
                            <h3
                                className="text-sm font-normal text-muted-foreground"
                                data-oid="-iyyxar"
                            >
                                Added fonts
                            </h3>
                        </div>

                        {/* System Font List */}
                        <div className="px-4" data-oid="jsliz.k">
                            <div
                                className="flex flex-col divide-y divide-border"
                                data-oid="-vga_n0"
                            >
                                {!fontManager.fonts.length ? (
                                    <div
                                        className="flex justify-center items-center border-dashed border-default border-2 rounded-lg h-20 my-2"
                                        data-oid="t5r0ov-"
                                    >
                                        <span
                                            className="text-sm text-muted-foreground"
                                            data-oid="6pqfg:2"
                                        >
                                            No fonts added
                                        </span>
                                    </div>
                                ) : (
                                    fontManager.fonts.map((font, index) => (
                                        <div
                                            key={`system-${font.family}-${index}`}
                                            data-oid="q-emd.n"
                                        >
                                            <div
                                                className="flex justify-between items-center"
                                                data-oid="rlrebc7"
                                            >
                                                <FontFamily
                                                    name={font.family}
                                                    variants={
                                                        font.weight?.map(
                                                            (weight) =>
                                                                VARIANTS.find(
                                                                    (v) => v.value === weight,
                                                                )?.name,
                                                        ) as string[]
                                                    }
                                                    showDropdown={true}
                                                    showAddButton={false}
                                                    isDefault={font.id === fontManager.defaultFont}
                                                    onRemoveFont={() =>
                                                        fontManager.removeFont(font)
                                                    }
                                                    onSetFont={() =>
                                                        fontManager.setDefaultFont(font)
                                                    }
                                                    data-oid="059qkyp"
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Site Fonts Section */}
                <div className="flex flex-col gap-1 pt-6 pb-4" data-oid="1m:6l--">
                    {/* Site Fonts Header */}
                    <div className="px-4" data-oid="qq:pjhp">
                        <h3
                            className="text-sm text-muted-foreground font-normal"
                            data-oid="2c6h43e"
                        >
                            {searchQuery ? 'Search results' : 'Browse new fonts'}
                        </h3>
                    </div>

                    {/* Site Font List */}
                    <div className="px-4" data-oid="pl5t8rj">
                        <div className="flex flex-col divide-y divide-border" data-oid="adnf5-.">
                            {uniqueSiteFonts?.length > 0 ? (
                                uniqueSiteFonts.map((font, index) => (
                                    <div key={`${font.family}-${index}`} data-oid="cyfxipq">
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="77avuqa"
                                        >
                                            <FontFamily
                                                name={font.family}
                                                variants={
                                                    font.weight?.map(
                                                        (weight) =>
                                                            VARIANTS.find((v) => v.value === weight)
                                                                ?.name,
                                                    ) as string[]
                                                }
                                                showDropdown={false}
                                                showAddButton={true}
                                                onAddFont={() => fontManager.addFont(font)}
                                                data-oid="ls_dtpq"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="flex justify-center items-center h-20 my-2"
                                    data-oid="-zd03fu"
                                >
                                    <span
                                        className="text-sm text-muted-foreground"
                                        data-oid="pousdxx"
                                    >
                                        No results were found
                                    </span>
                                </div>
                            )}
                        </div>
                        {/* Load More Button */}
                        {fontManager.hasMoreFonts && !searchQuery && (
                            <Button
                                variant="ghost"
                                className="w-full mt-4 h-9 text-sm text-muted-foreground hover:text-foreground bg-background-secondary hover:bg-background-secondary/70 rounded-lg border border-white/5"
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                data-oid="oq6rfaw"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2" data-oid="vpdthbw">
                                        <Icons.Shadow
                                            className="h-4 w-4 animate-spin"
                                            data-oid="tykp3qa"
                                        />

                                        <span data-oid="o8:yl92">Loading...</span>
                                    </div>
                                ) : (
                                    'Load more fonts'
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Button - Fixed at bottom */}
            <div className="p-4 border-t border-border mt-auto" data-oid="_woyunu">
                <Button
                    variant="ghost"
                    className="w-full h-11 text-sm text-muted-foreground hover:text-foreground bg-background-secondary hover:bg-background-secondary/70 rounded-lg border border-white/5"
                    onClick={handleUploadFont}
                    data-oid="yiypw8:"
                >
                    Upload a custom font
                </Button>
            </div>

            <UploadModal
                isOpen={isUploadModalOpen}
                onOpenChange={setIsUploadModalOpen}
                onUpload={handleFontUpload}
                data-oid="u--l5xf"
            />
        </div>
    );
});

export default FontPanel;
