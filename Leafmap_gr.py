import gradio as gr
from leafmap import leafmap_assembly

def create_split_map(png1, png2):
    # Convert PNG images to base64 strings for embedding
    png1_base64 = gr.inputs.Image.get_base64_encoded_image(png1)
    png2_base64 = gr.inputs.Image.get_base64_encoded_image(png2)
    
    # Create HTML content with Leafmap's split control
    html_content = f"""
    <html>
    <head>
        <title>Leafmap Split Control</title>
        <!-- Load Leafmap and dependencies -->
        {leafmap_assembly.header}
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Create Leafmap split map
            var m = leafmap.Map();
            m.split_map("{png1_base64}", "{png2_base64}");
            m.set_center([0, 0]);
            m.set_zoom(2);
            
            // Add map to the div element
            document.getElementById("map").appendChild(m);
        </script>
    </body>
    </html>
    """
    return html_content

# Define Gradio interface
iface = gr.Interface(
    fn=create_split_map,
    inputs=[
        gr.inputs.Image(type='file', label="Upload PNG Image 1"),
        gr.inputs.Image(type='file', label="Upload PNG Image 2")
    ],
    outputs=gr.outputs.HTML(),
    title="Leafmap Split Control",
    description="Upload two PNG images to compare them using Leafmap's split control feature."
)

# Launch the Gradio interface
iface.launch()
