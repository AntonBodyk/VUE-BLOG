export default {
    bind(el, binding) {
      
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = binding.value;
  
      
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      tooltip.style.color = "white";
      tooltip.style.padding = "5px";
      tooltip.style.borderRadius = "3px";
      tooltip.style.zIndex = "1000";
      tooltip.style.display = "none";
  
      
      document.body.appendChild(tooltip);
  
      
      el.addEventListener("mouseover", () => {
        tooltip.style.display = "block";
      });
  
      
      el.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });
  
      
      el.addEventListener("mousemove", (event) => {
        tooltip.style.top = event.clientY + 10 + "px";
        tooltip.style.left = event.clientX + 10 + "px";
      });
    },
  };