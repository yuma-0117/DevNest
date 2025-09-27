import { UserProfileSkeleton } from './components/user-profile-skeleton'
import { ThreadCardSkeleton } from '@/app/components/thread/thread-card-skeleton'
import { SimplePostCardSkeleton } from './components/simple-post-card-skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <UserProfileSkeleton />
      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <div className="flex flex-col gap-4">
            <ThreadCardSkeleton />
            <ThreadCardSkeleton />
            <ThreadCardSkeleton />
          </div>
        </TabsContent>
        <TabsContent value="posts">
          <div className="flex flex-col gap-4">
            <SimplePostCardSkeleton />
            <SimplePostCardSkeleton />
            <SimplePostCardSkeleton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Loading
