function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900 dark:text-neutral-100">Contact Us</h1>
      <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mb-6 sm:mb-8 leading-relaxed">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
      <form className="space-y-4 sm:space-y-6 bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
