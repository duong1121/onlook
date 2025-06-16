import { Icons } from '@onlook/ui/icons';

interface NodeIconProps {
    iconClass: string;
    tagName: string;
}

export const NodeIcon = ({ iconClass, tagName: preprocessedTagName }: NodeIconProps) => {
    const tagName = preprocessedTagName.toUpperCase();

    if (tagName === 'H1') {
        return <Icons.H1 className={iconClass} data-oid="7mf5tid" />;
    } else if (tagName === 'H2') {
        return <Icons.H2 className={iconClass} data-oid="swrm6r." />;
    } else if (tagName === 'H3') {
        return <Icons.H3 className={iconClass} data-oid="9m3e3-1" />;
    } else if (tagName === 'H4') {
        return <Icons.H4 className={iconClass} data-oid="x04cqhu" />;
    } else if (tagName === 'H5') {
        return <Icons.H5 className={iconClass} data-oid="3bg-_e7" />;
    } else if (tagName === 'H6') {
        return <Icons.H6 className={iconClass} data-oid="v-r-2lp" />;
    } else if (tagName === 'P') {
        return <Icons.Pilcrow className={iconClass} data-oid="l50ic5s" />;
    } else if (['STRONG', 'EM', 'SPAN', 'I'].includes(tagName)) {
        return <Icons.Text className={iconClass} data-oid="_q856fv" />;
    } else if (tagName === 'A') {
        return <Icons.Link className={iconClass} data-oid="lhdrtto" />;
    } else if (['IMG', 'SVG'].includes(tagName)) {
        return <Icons.Image className={iconClass} data-oid="cexbh:4" />;
    } else if (tagName === 'VIDEO') {
        return <Icons.Video className={iconClass} data-oid="evktcr4" />;
    } else if (tagName === 'IFRAME') {
        return <Icons.Frame className={iconClass} data-oid="67ae9lq" />;
    } else if (tagName === 'BUTTON') {
        return <Icons.Button className={iconClass} data-oid="jsjc6ub" />;
    } else if (tagName === 'INPUT') {
        return <Icons.Input className={iconClass} data-oid="val75f-" />;
    } else if (['UL', 'OL'].includes(tagName)) {
        return <Icons.ListBullet className={iconClass} data-oid=".xstxu." />;
    } else if (tagName === 'SECTION') {
        return <Icons.Section className={iconClass} data-oid=".l5ea8w" />;
    } else if (tagName === 'DIV') {
        return <Icons.Box className={iconClass} data-oid="p9ck2tw" />;
    } else if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD'].includes(tagName)) {
        return <Icons.ViewGrid className={iconClass} data-oid="o5950-9" />;
    } else if (tagName === 'FORM') {
        return <Icons.ViewHorizontal className={iconClass} data-oid="zg3h-17" />;
    } else if (['SELECT', 'OPTION'].includes(tagName)) {
        return <Icons.DropdownMenu className={iconClass} data-oid=":p.yoet" />;
    } else if (tagName === 'TEXTAREA') {
        return <Icons.ViewVertical className={iconClass} data-oid="ua_fync" />;
    } else if (tagName === 'CANVAS') {
        return <Icons.PencilPaper className={iconClass} data-oid="u:tk04e" />;
    } else if (tagName === 'BODY') {
        return <Icons.Desktop className={iconClass} data-oid="4e7p9n:" />;
    } else {
        return <Icons.Frame className={iconClass} data-oid="nx_.v6m" />;
    }
};
