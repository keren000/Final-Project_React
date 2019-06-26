require 'test_helper'

class MyBooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @my_book = my_books(:one)
  end

  test "should get index" do
    get my_books_url, as: :json
    assert_response :success
  end

  test "should create my_book" do
    assert_difference('MyBook.count') do
      post my_books_url, params: { my_book: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show my_book" do
    get my_book_url(@my_book), as: :json
    assert_response :success
  end

  test "should update my_book" do
    patch my_book_url(@my_book), params: { my_book: {  } }, as: :json
    assert_response 200
  end

  test "should destroy my_book" do
    assert_difference('MyBook.count', -1) do
      delete my_book_url(@my_book), as: :json
    end

    assert_response 204
  end
end
