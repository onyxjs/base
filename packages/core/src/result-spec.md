# Result

 - Returns from a Runnable instances run method. (Suite | Test)

 ```ts
// Base result interface
interface Result {
  id: string
  description: string
  filePath: string
  failures: { [key: Result[id]]: Error }
  status: RunResultStatus
  time: number
  title: string
  type: RunnableType
}
 ```
