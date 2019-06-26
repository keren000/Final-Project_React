class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  # GET /books
  def index
    @books = Book.all
    render json: @books   
  end

  def search 
    query = params[:search_query]
    if query
      books = Book.where('title LIKE :query',{:query => "%#{query}%"}) 
      render json: books
    end
  end
 
  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    @book = Book.new(book_params)
    # ----- BOOOK -----
    #------------------
    puts @book.inspect
    # ----------------
    if @book.save
      render json: @book, status: :created, location: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy
  end

  private
    # Use callbacks.
    def set_book
      @book = Book.find_by(id:params[:id])
      puts @book.inspect
    end

    # Allow a trusted parameter "white list" through.
    def book_params
    params.require(:book).permit(
      [  
        :title,
        :description,
        :author,
        :pages,
        :publication
      ]
    )
  end
end
