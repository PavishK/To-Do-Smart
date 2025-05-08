
export const MakeCalculation=async(data)=>{
    const prompt=`
              Analyze ONLY tasks where 'checked: false' from this list and respond in a structured paragraph. For each unchecked item:

          1) **For Products** (formats: 'milk 1L', 'shampoo 2x100'):
            - Extract product name and quantity (default: 1)
            - If price exists (e.g., '2x100' → ₹200 total): 
              *"Skipped purchase: 2 shampoo (would have cost ₹200)"*
            - If price unknown (e.g., 'rice 5kg'):
              → Search web for current Indian market price of '[quantity] [product]'
              *"Skipped purchase: 5kg rice (current market price: ₹450/kg | Source: BigBasket)"*
            - If search fails: *"Skipped purchase: [product] (price estimate unavailable)"*

          2) **For Entertainment** ('watch movie/anime'):
            - Web-search for 'trending [movies/anime] March 2024'
            *"Skipped watching: Consider these trending options: 1) Dune: Part Two (sci-fi) 2) Shōgun (drama)"*

          3) **Other Tasks**:
            *"Postponed reminder: [task]"*

          **Special Features:**
          🔍 Active web search for missing prices (Indian e-commerce sources)
          📊 Includes price sources when available
          🎬 Real-time entertainment suggestions
          🚫 Completely ignores checked: true items

          **Example Input:**
          json
          [
            {"checked":false, "todo":"dove shampoo 200ml"},
            {"checked":false, "todo":"watch movie"},
            {"checked":true, "todo":"eggs 6x10"} // ← Ignored
          ]
          **Example Output:**
          "You skipped purchasing Dove shampoo 200ml (current price: ₹225 on Nykaa). For movies, recent popular choices are: 1) Article 370 (drama) 2) Kung Fu Panda 4 (animation)."

          **Process this data:** ${JSON.stringify(data)}
    `;
    try {
        const res=await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.DEEPSEEK_KEY}`,
              "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
              "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "deepseek/deepseek-r1:free",
              "messages": [
                {
                  "role": "user",
                  "content": prompt
                }
              ]
            })
          });
    
          const data=await res.json();
          return data.choices?.[0]?.message?.content || "Something went wrong.please retry! 😓";
        
    } catch (error) {
        return "Error on Server. 😵" 
    }
}
