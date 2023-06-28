import { UserProfile } from "@/common.types";
import Profilepage from "@/components/Profilepage";
import { getUserProjects } from "@/lib/actions";
type Props = {
    params: {
        id: string;
    }
}
import React from 'react'

async function UserProfile({ params }: Props) {
    const result = await getUserProjects(params?.id, 100) as { user: UserProfile };
    if (!result?.user) return (
        <p className="no-result_text">Failes to fetch user Info</p>
    )
  return (
    <Profilepage user={result?.user} />
  )
}

export default UserProfile