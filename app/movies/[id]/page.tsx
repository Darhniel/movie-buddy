'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function Page({params}) {
    const search = useSearchParams();
    const router = useRouter()
    const pathname = usePathname();
    console.log(params.id)
    return (
        <div>Movie Detaisl</div>
    )
}