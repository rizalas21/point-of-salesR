import EditUsers from "@/app/component/users/EditUsers";

export default function UsersEdit() {
  return (
    <main className="flex flex-col bg-slate-100 h-full p-5 gap-3 drop-shadow-md">
      <h1>Users</h1>
      <EditUsers />
    </main>
  );
}
