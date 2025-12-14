function TailwindTest() {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg xs:bg-green-500 sm:bg-yellow-500 md:bg-red-500 lg:bg-purple-500 xl:bg-pink-500 2xl:bg-indigo-500">
      <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
        Tailwind CSS Responsive Test
      </h2>
      <p className="mt-2 text-xs sm:text-sm md:text-base">
        Resize your browser to see the responsive breakpoints in action!
      </p>
      <ul className="mt-4 space-y-1 text-xs sm:text-sm">
        <li>xs (475px+): Green background</li>
        <li>sm (640px+): Yellow background</li>
        <li>md (768px+): Red background</li>
        <li>lg (1024px+): Purple background</li>
        <li>xl (1280px+): Pink background</li>
        <li>2xl (1536px+): Indigo background</li>
      </ul>
    </div>
  )
}

export default TailwindTest
