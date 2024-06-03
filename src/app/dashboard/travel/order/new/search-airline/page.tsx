// import { GetServerSidePropsContext } from 'next';

import TravelSearchAirline from "src/sections/travel/order/new/travel-search-airline/view";

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Travel Search Airline',
};

interface PageProps {
    path: string;
}
// export default function Page({ path }: PageProps) {
export default function Page() {
    return <TravelSearchAirline />;
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const path = context.query.path as string | undefined;

//     if (!path) {
//         return {
//             props: {
//                 path: 'defaultPath', // or handle however you prefer
//             },
//         };
//     }

//     return {
//         props: {
//             path,
//         },
//     };
// }
