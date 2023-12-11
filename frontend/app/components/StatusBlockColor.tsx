import Link from "next/link";

export default function StatusBlockColor(
  status: string,
  baseStyle: string,
  paramsId?: number,
  approvingFunction?: (id: number, approval: boolean) => void,
) {
  if (status === "APPROVED" || status === "settlement") {
    return (
      <div className={`bg-green-400 ${baseStyle}`}>
        {status === "settlement" ? "Berhasil" : "Approved"}
      </div>
    );
  } else if (status === "REJECTED") {
    return <div className={`bg-red-400 ${baseStyle}`}>{"Rejected"}</div>;
  } else if (status === "PENDING") {
    return <div className={`bg-yellow-400 ${baseStyle}`}>{"Pending"}</div>;
  } else if (status === "OWNER") {
    return (
      <Link
        className={`block cursor-pointer bg-blue-400 ${baseStyle}`}
        href={`/owner/edit/coworking-space/${paramsId}`}
      >
        {"Edit"}
      </Link>
    );
  } else if (status === "ADMIN" && paramsId && approvingFunction) {
    return (
      <>
        <div
          className={`cursor-pointer bg-gray-200 font-semibold text-green-500 ${baseStyle}`}
          onClick={(e) => {
            e.preventDefault();
            approvingFunction(paramsId, true);
          }}
        >
          {"Approve"}
        </div>

        <div
          className={`my-2 cursor-pointer bg-gray-200 font-semibold text-red-500 ${baseStyle}`}
          onClick={(e) => {
            e.preventDefault();
            approvingFunction(paramsId, false);
          }}
        >
          {"Reject"}
        </div>
      </>
    );
  }
}
