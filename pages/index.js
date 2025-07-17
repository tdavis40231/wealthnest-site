export default function Home() {
  return (
    <main>
      <form
        action="https://buttondown.email/tdavis40231"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.email/tdavis40231', 'popupwindow')"
        className="embeddable-buttondown-form"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <input
          type="submit"
          value="Subscribe"
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        />
      </form>
      <h1>Welcome to WealthNest</h1>
      <p>Your Christian-friendly financial hub for young adults.</p>
    </main>
    );
}
