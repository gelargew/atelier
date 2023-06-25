import Link from "next/link"

const routers = [
    {
        path: '/godrays',
        name: 'God Ray'
    },
    {
        path: '/sheda',
        name: 'Liquid Shader'
    },
    {
        path: '/grass',
        name: 'Grass'
    }
]

export default function Page() {

    return (
        <main className="w-screen min-h-screen">
            <ul className="text-white text-2xl gap-2 m-auto flex flex-col w-fit pt-[30vh]" >
                {routers.map((router) => (
                    <Link key={router.name} className="hover:underline" href={router.path}>

                        {router.name}
                    </Link>
                ))}
            </ul>
        </main>
    )
}