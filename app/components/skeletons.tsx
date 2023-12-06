const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm h-80`}
    >
      <div className="flex items-center justify-center truncate rounded-xl bg-gray-200 px-4 py-8 h-60 mb-4">
        
      </div>
      <div className='flex items-center justify-center'>
        <div className="h-7 w-52 rounded-md bg-gray-200" />
      </div>
      
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}