import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

export interface InviteUserEmailProps {
    invitedByEmail: string;
    inviteLink: string;
}

export const InviteUserEmail = ({ invitedByEmail, inviteLink }: InviteUserEmailProps) => {
    const previewText = `Join ${invitedByEmail} on Onlook`;

    return (
        <Html data-oid="hego-0g">
            <Head data-oid="sf3-73f" />
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                background: '#19191d',
                                brand: '#af90ff',
                                foreground: '#fff',
                                border: 'rgb(56, 53, 53)',
                            },
                        },
                    },
                }}
                data-oid="ii6jds1"
            >
                <Body
                    className="mx-auto my-auto bg-background text-foreground px-2 font-sans"
                    data-oid="7fz2dtx"
                >
                    <Preview data-oid="c6f4i64">{previewText}</Preview>
                    <Container
                        className="mx-auto my-[40px] max-w-[465px] rounded border border-border border-solid p-[20px]"
                        data-oid="ldo8302"
                    >
                        <Heading
                            className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-white"
                            data-oid="zehp__n"
                        >
                            Join <strong data-oid="mihir-_">{invitedByEmail}</strong> on{' '}
                            <strong data-oid=":-6miuk">Onlook</strong>
                        </Heading>
                        <Text className="text-[14px] text-white leading-[24px]" data-oid="13cqnwg">
                            Hello,
                        </Text>
                        <Text className="text-[14px] text-white leading-[24px]" data-oid="nxzanjp">
                            <strong data-oid="gg8wte-">{invitedByEmail}</strong> (
                            <Link
                                href={`mailto:${invitedByEmail}`}
                                className="text-brand no-underline"
                                data-oid="s.8qigh"
                            >
                                {invitedByEmail}
                            </Link>
                            ) has invited you to their project on{' '}
                            <strong data-oid="49rgeg7">Onlook</strong>.
                        </Text>
                        <Section className="mt-[32px] mb-[32px] text-center" data-oid=".ifzsg0">
                            <Button
                                className="rounded bg-brand px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                                href={inviteLink}
                                data-oid="s7gas-s"
                            >
                                Join
                            </Button>
                        </Section>
                        <Text className="text-[14px] leading-[24px]" data-oid="u6uz49.">
                            or copy and paste this URL into your browser:{' '}
                            <Link
                                href={inviteLink}
                                className="text-brand no-underline"
                                data-oid="j3ma_v_"
                            >
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr
                            className="mx-0 my-[26px] w-full border border-border border-solid"
                            data-oid="v1v15rj"
                        />
                        <Text
                            className="text-foreground/50 text-[12px] leading-[24px]"
                            data-oid="2bz-spz"
                        >
                            This invitation was intended for{' '}
                            <span className="text-foreground" data-oid="eht33c5">
                                {invitedByEmail}
                            </span>
                            . If you were not expecting this invitation, you can ignore this email.
                            If you are concerned about your account's safety, please reply to this
                            email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

InviteUserEmail.PreviewProps = {
    invitedByEmail: 'kiet@onlook.com',
    inviteLink: 'https://onlook.com',
} as InviteUserEmailProps;

export default InviteUserEmail;
