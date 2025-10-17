export default function About() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10 space-y-6">
      <h2 className="text-2xl font-semibold">About This Project</h2>
      <p className="max-w-2xl">
        Hi, I'm <strong>Tareq</strong> (Student Number: <strong>21396516</strong>).
        This project was developed as part of the LTU GitHub Automation App assignment.
        It demonstrates how to interact with GitHub repositories through a simulated robot teammate
        using a web-based interface built with <strong>Next.js</strong>.
      </p>

      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-medium mb-2">Demo Video</h3>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="How to use this website"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
