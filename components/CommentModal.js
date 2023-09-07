import { useRecoilState } from "recoil"
import { modalState } from "../atom/modalAtom"

function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
        
    </div>
  )
}

export default CommentModal