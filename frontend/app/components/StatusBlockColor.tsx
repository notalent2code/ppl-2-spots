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
        <button
          className={`my-2 w-full border-2 text-green-500 hover:border-gray-300 hover:bg-gray-300 active:bg-teal-600 ${baseStyle}`}
          onClick={(e) => {
            e.preventDefault();
            approvingFunction(paramsId, true);
          }}
        >
          {"Approve"}
        </button>

        <button
          className={`my-2 w-full border-2 text-red-500 hover:border-gray-300 hover:bg-gray-300 active:bg-teal-600 ${baseStyle}`}
          onClick={(e) => {
            e.preventDefault();
            approvingFunction(paramsId, false);
          }}
        >
          {"Reject"}
        </button>
      </>
    );
  }
}
