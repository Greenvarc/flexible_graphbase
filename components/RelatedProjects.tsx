import { UserProfile,ProjectInterface } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import Image from "next/image";

type Props = {
    userId: string;
    projectId: string;
}

async function RelatedProjects({ userId, projectId }: Props) {
    const result = await getUserProjects(userId) as { user?: UserProfile }
    const filteredProject = result?.user?.projects?.edges?.filter(({ node }: { node: ProjectInterface }) => node?.id !== projectId)
    if (filteredProject?.length === 0) return null;
  return (
      <section className="flex flex-col mt-32 w-full">
          <div className="flexBetween">
              <p className="text-base font-bold">More by {result?.user?.name}</p>
              <Link
                  href={`/profile/${result?.user?.id}`}
                  className="text-primary-purple text-base"
              >
                  View All
              </Link>
          </div>
          <div className="related_projects-grid">
              {
                  filteredProject?.map(({ node }: { node: ProjectInterface }) => (
                      <div className="flexCenter related_project-card drop-shadow-card">
                          <Link
                              href={`/project/${node?.id}`}
                              className="flexCenter group relative w-full h-full"
                          >
                              <Image
                                  src={node?.image}
                                  width={414}
                                  height={314}
                                  className="w-full h-full object-cover rounded-2xl"
                                  alt="object image"
                              />
                              <div className="hidden group-hover:flex related_project-card_title">
                                  <p className="w-full">{node?.title}</p>
                              </div>
                          </Link>
                      </div>
                    ))
                }
          </div>
    </section>
  )
}

//   <ProjectCard
//       id={node?.id}
//       image={node?.image}
//       name={node?.createdBy?.name}
//       title={node?.title}
//       userId={node?.createdBy?.id}
//       key={node?.id}
//       avatarUrl={node?.createdBy?.avatarUrl}
//   />
export default RelatedProjects