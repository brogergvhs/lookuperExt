export default function Layout({children}) {

  return (<>
    <div className="flex flex-col min-h-[600px] min-w-[430px] p-4">
      {children}
    </div>
  </>);
}
