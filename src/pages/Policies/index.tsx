import { useParams } from "react-router-dom";
import { useGetPolicyByIdQuery } from "../../services/policyService";

export default function Policies() {
  const { slug } = useParams();

  const policyId = slug ? slug.split("-").slice(-1)[0] : null;

  if (!policyId || isNaN(Number(policyId))) {
    return <div className="section-container py-10">Không tồn tại chính sách này</div>;
  }

  const { data: policiesResult } = useGetPolicyByIdQuery(policyId);

  return (
    <div className="section-container py-10">
      <div dangerouslySetInnerHTML={{ __html: policiesResult?.data?.content || "" }} />
    </div>
  );
}
