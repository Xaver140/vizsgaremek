namespace asztali
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            listBox1 = new ListBox();
            Update = new Button();
            Insert = new Button();
            Delete = new Button();
            SuspendLayout();
            // 
            // listBox1
            // 
            listBox1.Dock = DockStyle.Left;
            listBox1.FormattingEnabled = true;
            listBox1.ItemHeight = 15;
            listBox1.Location = new Point(0, 0);
            listBox1.Name = "listBox1";
            listBox1.Size = new Size(517, 450);
            listBox1.TabIndex = 0;
            listBox1.SelectedIndexChanged += listBox1_SelectedIndexChanged;
            // 
            // Update
            // 
            Update.Location = new Point(555, 14);
            Update.Name = "Update";
            Update.Size = new Size(197, 61);
            Update.TabIndex = 1;
            Update.Text = "update";
            Update.UseVisualStyleBackColor = true;
            Update.Click += Update_Click;
            // 
            // Insert
            // 
            Insert.Location = new Point(551, 95);
            Insert.Name = "Insert";
            Insert.Size = new Size(208, 62);
            Insert.TabIndex = 2;
            Insert.Text = "insert";
            Insert.UseVisualStyleBackColor = true;
            Insert.Click += Insert_Click;
            // 
            // Delete
            // 
            Delete.Location = new Point(542, 186);
            Delete.Name = "Delete";
            Delete.Size = new Size(223, 54);
            Delete.TabIndex = 3;
            Delete.Text = "delete";
            Delete.UseVisualStyleBackColor = true;
            Delete.Click += Delete_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(Delete);
            Controls.Add(Insert);
            Controls.Add(Update);
            Controls.Add(listBox1);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ResumeLayout(false);
        }

        #endregion

        private ListBox listBox1;
        private Button Update;
        private Button Insert;
        private Button Delete;
    }
}