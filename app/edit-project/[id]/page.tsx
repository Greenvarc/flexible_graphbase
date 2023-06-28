import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import { getProjecDectails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation";

async function EditProject({ params: { id } }: { params:{id:string}}) {
  const session = await getCurrentUser();
    //if no usser redirect home
  if (!session?.user) redirect('/');
  
  //get project details
  const result =await getProjecDectails(id) as {project?:ProjectInterface}
  return (
      <Modal>
          <h3 className="modal-head-text">edit Project</h3>

      <ProjectForm type="edit" session={session} project={result?.project} />
    </Modal>
  )
}

export default EditProject