import Image from 'next/image';

export function Dunes() {
    return (
        <div className="hidden w-full lg:block md:block m-6" data-oid="astjbpi">
            <Image
                className="w-full h-full object-cover rounded-xl hidden dark:flex"
                src={'/assets/dunes-login-dark.png'}
                alt="Onlook dunes dark"
                width={1000}
                height={1000}
                data-oid="wre-7sm"
            />

            <Image
                className="w-full h-full object-cover rounded-xl flex dark:hidden"
                src={'/assets/dunes-login-light.png'}
                alt="Onlook dunes light"
                width={1000}
                height={1000}
                data-oid="v13yyd6"
            />
        </div>
    );
}
