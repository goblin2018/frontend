export default function ContentLayout({
  header,
  searchBar,
  children,
  footer,
}: {
  header: React.ReactNode
  searchBar?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <>
      <div className="h-12 w-full">{header}</div>
      <div className="h-[calc(100%-48px)] w-full p-4 bg-bg flex flex-col">
        {searchBar && <div className="mb-2 py-2 px-4 bg-white flex-shrink-0">{searchBar}</div>}
        <div className="flex-1 w-full max-w-full bg-white overflow-y-auto">{children}</div>
        {footer && <div className="flex-shrink-0 h-12 flex items-center justify-end px-4">{footer}</div>}
      </div>
    </>
  )
}
