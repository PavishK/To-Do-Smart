
export const resolvers={
    Query:{
         data:()=>"Hello World! ☺️"
    },

    Mutation:{
        getToDoList:async (_, { lists }) => {
            const prompt = `
            Analyze ONLY tasks where 'checked: false' from this list and respond in a structured paragraph. For each unchecked item:

            1) **For Products** (formats: 'milk 1L', 'shampoo 2x100'):
              - Extract product name and quantity (default: 1)
              - If price exists (e.g., '2x100' → ₹200 total): 
                *"Skipped purchase: [quantity] [product] (would have cost ₹[total_price])"*
              - If price is unknown (e.g., 'rice 5kg'):
                → Search web for the current Indian market price of '[quantity] [product]'.
                *"Skipped purchase: [quantity] [product] (current market price: ₹[price_per_unit] | Source: [source])"*
              - If search fails: *"Skipped purchase: [product] (price estimate unavailable)"*

            2) **For Entertainment** (e.g., 'watch movie/anime'):
              - Web-search for 'trending [movies/anime] March 2024'.
              *"Skipped watching: Consider these trending options: 1) [Movie1] ([genre]) 2) [Movie2] ([genre])"*

            3) **Other Tasks**:
              *"Postponed reminder: [task]"*

            **Special Features:**
            🔍 Active web search for missing prices (Indian e-commerce sources)
            📊 Includes price sources when available
            🎬 Real-time entertainment suggestions
            🚫 Completely ignores checked: true items

            **Example Input:**
            '''json
            [
              {"checked": false, "todo": "dove shampoo 200ml"},
              {"checked": false, "todo": "watch movie"},
              {"checked": true, "todo": "eggs 6x10"} // ← Ignored
            ]
      Example Output:
          "You skipped purchasing Dove shampoo 200ml (current price: ₹225 on Nykaa). For movies, recent popular choices are: 1) Article 370 (drama) 2) Kung Fu Panda 4 (animation)."

          Process this data: ${JSON.stringify(lists)}
`;
      
            if (!process.env.DEEPSEEK_KEY) {
              console.error("❌ DEEPSEEK_KEY is missing from env.");
              return "Server error: Missing API key.";
            }
      
            try {
              const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${process.env.DEEPSEEK_KEY}`,
                  "HTTP-Referer": "https://to-do-smart.onrender.com/",
                  "X-Title": "To Do Smart",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  model: "deepseek/deepseek-r1:free",
                  messages: [{ role: "user", content: prompt }]
                })
              });
      
              const result = await response.json();
              return result.choices?.[0]?.message?.content || "No content returned.";
            } catch (error) {
              console.error("❌ Error fetching from OpenRouter:", error);
              return "Server error. 😵";
            }
          }
      
    }
}