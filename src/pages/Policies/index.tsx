import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PolicyDetailSkeleton from "../../components/policy/PolicyDetailSkeleton";
import { useGetPolicyByIdQuery } from "../../services/policyService";

export default function Policies() {
  const { slug } = useParams();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const policyId = slug ? slug.split("-").slice(-1)[0] : null;

  if (!policyId || isNaN(Number(policyId))) {
    return <div className="section-container py-10">Không tồn tại chính sách này</div>;
  }

  const { data: policiesResult, isLoading, isFetching } = useGetPolicyByIdQuery(policyId);

  useEffect(() => {
    if (isLoading || isFetching) {
      setShowSkeleton(true);
      return;
    }

    const timer = window.setTimeout(() => setShowSkeleton(false), 120);
    return () => window.clearTimeout(timer);
  }, [isLoading, isFetching, policiesResult]);

  return (
    <div className="mx-auto min-h-150">
      <div className="grid">
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 1 : 0 }}
          aria-hidden={!showSkeleton}
        >
          <PolicyDetailSkeleton />
        </div>

        <div
          className="section-container py-10 ck-content col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
        >
          <div dangerouslySetInnerHTML={{ __html: policiesResult?.data?.content || "" }} />
        </div>
      </div>
    </div>
  );
}
