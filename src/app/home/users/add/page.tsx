import AddUsers from "@/app/component/users/AddUsers";

export default function UsersAdd() {
  return (
    <main className="flex flex-col bg-slate-100 h-full p-5 gap-3 drop-shadow-md">
      <h1>Users</h1>
      <AddUsers />
    </main>
  );
}
