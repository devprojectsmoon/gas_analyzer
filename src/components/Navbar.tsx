import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            GasAnalyzer
          </span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            href="/gas" 
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
          >
            Gas Analysis
          </Link>
          <Link 
            href="/txhash" 
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
          >
            Transactions
          </Link>
          <Link 
            href="/data" 
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
          >
            Data
          </Link>
        </nav>
      </div>
    </header>
  )
}

// import Link from 'next/link'

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold">
//           Gas Analyzer
//         </Link>
//         <div className="flex space-x-4">
//           <Link href="/gas" className="hover:text-gray-300">
//             Gas Analysis
//           </Link>
//           <Link href="/txhash" className="hover:text-gray-300">
//             Transaction Hash
//           </Link>
//           <Link href="/data" className="hover:text-gray-300">
//             Data
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }